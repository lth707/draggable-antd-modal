const containsNode = (parentNode, childrenNode) => {
  if (!parentNode || !childrenNode) {
    return false;
  }
  if (parentNode === childrenNode) return true;
  let targetNode = childrenNode;
  while (targetNode) {
    targetNode = targetNode.parentNode;
    if (targetNode === parentNode) return true;
  }
  return false;
};

export default containsNode;
