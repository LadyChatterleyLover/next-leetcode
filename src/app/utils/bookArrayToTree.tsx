import { LeetBookPage } from '../types'

export const array2Tree = (items: LeetBookPage[]) => {
  const result = []
  const itemMap: Record<string, any> = {}
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] }
  }

  for (const item of items) {
    const id = item.id
    const pid = item.parentId
    const treeItem = itemMap[id]
    if (pid === null) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid!]) {
        itemMap[pid!] = {
          children: [],
        }
      }
      itemMap[pid!].children.push(treeItem)
    }
  }
  return result
}
