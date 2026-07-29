# Knowledge Architecture (FP9C.1)

The knowledge engine transforms independent domain objects (Articles, Projects, Journey Entries) into a connected, searchable, and discoverable knowledge ecosystem.

## Core Flow

1. **Domains (`src/content/*`)**: Raw data exists purely in its domain. Projects know nothing about Articles.
2. **Adapters (`src/lib/knowledge/adapters/`)**: Map domain data to a generic `KnowledgeEntity` structure.
3. **Registry (`src/lib/knowledge/registry.ts`)**: Initializes the system and registers adapted entities.
4. **Store + Indexes (`src/lib/knowledge/store/`)**: An in-memory store (`memoryStore.ts`) holds all entities, while an indexer (`indexer.ts`) creates `O(1)` lookup maps for tags, tech, categories, and series.
5. **Relationship Engine (`src/lib/knowledge/engine/`)**: Uses weighted scoring to compute relationships dynamically based on metadata intersections.
6. **Public API (`src/lib/knowledge/index.ts`)**: A strict facade. Exposes high-level functional APIs (e.g., `discoverRelated`) so the UI never talks directly to the engine or store.
7. **UI (`src/components/knowledge/`)**: Framework-agnostic React components that exclusively consume `KnowledgeEntity` objects.

## Principles
- **No God Objects**: Strictly separated responsibilities.
- **Computed Relationships**: We never use hardcoded ID references. Related content is strictly computed via shared metadata.
- **Strict Public API**: Feature components must only import from `src/lib/knowledge/index.ts`.
- **Global Identifiers**: All entities use URNs (`urn:type:slug`) to prevent collisions.
