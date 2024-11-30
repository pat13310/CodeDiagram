export const DEFAULT_MERMAID_CODE = `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`;

export const EXAMPLE_DIAGRAMS = {
  flowchart: DEFAULT_MERMAID_CODE,
  sequence: `sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`,
  gantt: `gantt
    title A Gantt Diagram
    dateFormat YYYY-MM-DD
    section Section
    A task           :a1, 2024-01-01, 30d
    Another task     :after a1, 20d`
};