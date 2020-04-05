import {
  ComposeConfig,
  GroupRule,
} from '../config';
import { ImportNode } from '../parser';

export default class SortGroup {
  private readonly flag_: GroupRule['flag'];
  private readonly regex_: RegExp | undefined;
  private readonly subGroups_?: SortGroup[];
  private nodes_: ImportNode[] = [];
  private scripts_: ImportNode[] = [];

  constructor(rule: GroupRule) {
    const { flag, regex, subGroups } = rule;
    this.flag_ = flag;
    this.regex_ = regex || regex === '' ? RegExp(regex) : undefined;
    this.subGroups_ = subGroups
      ?.map(r => {
        if (typeof r === 'string') return flag === 'all' ? { regex: r } : { flag, regex: r };
        if (Array.isArray(r)) return flag === 'all' ? { subGroups: r } : { flag, subGroups: r };
        const f = r.flag ?? (flag === 'all' ? undefined : flag);
        return { ...r, flag: f };
      })
      .map(r => new SortGroup(r));
  }

  add(node: ImportNode, fallBack = false) {
    const { isScript, moduleIdentifier } = node;
    if (this.flag_ === 'scripts' && !isScript) return false;
    if (!this.flag_ && isScript) return false;
    if (this.regex_) {
      if (!this.regex_.test(moduleIdentifier)) return false;
      if (this.addToSubGroup(node, fallBack)) return true;
      if (!fallBack && this.addToSubGroup(node, true)) return true;
      isScript ? this.scripts_.push(node) : this.nodes_.push(node);
      return true;
    } else if (!this.subGroups_) {
      if (fallBack) isScript ? this.scripts_.push(node) : this.nodes_.push(node);
      return fallBack;
    }
    return this.addToSubGroup(node, fallBack);
  }

  private addToSubGroup(node: ImportNode, fallBack: boolean) {
    if (!this.subGroups_) return false;
    for (const g of this.subGroups_) if (g.add(node, fallBack)) return true;
    return false;
  }

  sortAndMerge() {
    this.nodes_ = sortAndMergeNodes(this.nodes_);
    this.scripts_ = sortAndMergeNodes(this.scripts_);
    this.subGroups_?.forEach(g => g.sortAndMerge());
    return this;
  }

  compose(config: ComposeConfig, sep: string): string {
    const { nl } = config;
    return [
      this.scripts_.map(n => n.compose(config)).join(nl),
      ...(this.subGroups_?.map(g => g.compose(config, nl)) ?? []),
      this.nodes_.map(n => n.compose(config)).join(nl),
    ]
      .filter(t => !!t)
      .join(sep);
  }
}

function sortAndMergeNodes(nodes: ImportNode[]) {
  const merged = nodes
    .sort((a, b) => a.compare(b))
    .reduce((r, n) => {
      if (!r.length) return [n];
      const last = r[r.length - 1];
      if (last.merge(n)) return r;
      return [...r, n];
    }, new Array<ImportNode>());
  merged.forEach(n => n.sortBindingNames());
  // Sort nodes again because binding names may have changed.
  return merged.sort((a, b) => a.compare(b));
}