export function findNodeInCode(code: string, nodeId: string) {
  const lines = code.split('\n');
  const cleanNodeId = nodeId.replace('flowchart-', '').replace('node-', '');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match node definitions with various formats
    const nodePattern = new RegExp(`\\b${cleanNodeId}[\\[{(]|\\b${cleanNodeId}\\s*-->|\\b${cleanNodeId}\\s*---|-->\\s*${cleanNodeId}\\b|---\\s*${cleanNodeId}\\b`);
    if (nodePattern.test(line)) {
      return {
        line: i + 1,
        text: line.trim()
      };
    }
  }
  
  return null;
}