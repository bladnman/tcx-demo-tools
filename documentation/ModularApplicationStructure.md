# Modular Application Structure (MAS)

## Overview

This document outlines a hierarchical, modular application structure designed to
organize and manage the components and utilities of a web application
effectively. This architecture facilitates scalability, maintainability, and
clarity by segmenting the application into clearly defined areas of concern,
each with its own context. The structure is recursive, allowing each significant
element to have its substructure mirroring the global architecture.

[![mas-small.png](assets/mas-small.png)](assets/mas.png)

## Directory Structure

The application is organized into several key directories at the root level,
with the possibility of repeating a similar structure within each feature
component. This recursive approach allows each feature to encapsulate its
dependencies, components, and utilities, fostering a modular and scalable
codebase.

```
- src
  - common
  - features
    - [feature-name]
      - common
      - features
      - hooks
      - utils
      - [FeatureName].tsx
  - hooks
  - utils
  - Main.tsx
```

**Note:** The `common`, `features`, `hooks`, and `utils` directories can be
replicated within each feature or component to maintain a consistent structure.
This is the real heart of the **MAS** pattern. This is non-prescriptive and can be
adapted to the specific needs of the application. If your application needs `stores`
at multiple levels, you can add a `stores` directory to this pattern. Etc.


## Key Directories

- **src**: The root folder containing the source code of the application.

    - **common**: This directory houses components  that are shared across 
      the entire application.

    - **features**: Features are significant, distinguishable parts of the
      application, such as "menu-bar" or "dashboard". Each feature acts as a
      standalone module with its context. The _features_ directory is intended to 
      mimic a user's mental model of the application, making it easier to navigate
      and understand the codebase. The concept of "within its context" is important
      here. This means the "menu-bar" will have its own `/features` folder that may have
      subdirectories like `login-button`, `menu-button`, `title`. These become **features**
      when you consider the context of the `menu-bar`.

        - **[feature-name]**: Represents a specific feature directory, e.g., "
          menu-bar". Each feature directory can include the following
          subdirectories, creating a specific context for the feature.

            - **common**: Contains components common to the
              specific feature but not intended for global reuse. These are
              shared across the feature's components and sub-features.

            - **features**: Hosts sub-features or components that are
              significant enough to warrant their encapsulated structure but are
              specific to the parent feature.

            - **hooks**: Dedicated to React hooks specific to the feature,
              facilitating state management, side effects, and logic
              encapsulation within the feature's context.

            - **utils**: Contains utility functions and helpers specific to the
              feature, aiding in tasks like data formatting, validation, and
              algorithms that are not globally relevant.

            - **[FeatureName].tsx**: The main React component file for the
              feature, serving as the entry point or root component for the
              feature's functionality.

    - **hooks**: A directory for shared React hooks, applying across
      multiple features or components within the application.

    - **utils**: Utility functions and helpers shared across the
      application, not tied to specific features or components.

- **Main.tsx**: The main application entry point, typically responsible for
  application routing, global context providers, and the initial application
  structure.

## Modular Approach

Each feature within the `features` directory follows a modular architecture,
allowing it to encapsulate its logic, state, and sub-components. This design
supports a clean separation of concerns, making the codebase more manageable and
scalable.

## Local Parts Convention

While the `common`, `features`, `hooks`, and `utils` directories can be
replicated within each feature to maintain a consistent structure, the `parts`
directory is an exception. `Parts` should be used at any level to indicate
components that are locally used by their parent component or feature and are
not intended to be reused elsewhere, even within the same feature. This
distinction helps in understanding the scope and reusability of components
within the application.

## Conclusion

This **Modular Application Structure** is designed to facilitate a clean separation of
concerns, promote reusability, and accommodate the growth of the application. By
adhering to this structure, developers can maintain a well-organized codebase
that scales efficiently with the application's complexity and size.

### Nothing is ever this clean

We understand that on paper it's easy to define things like this, but once you start
working on a project, you'll find that things are never this clean. You'll have to
make decisions about where to put things, and sometimes you'll have to break the
rules. That's okay. The goal is to have a consistent structure that makes sense to
the team and is easy to navigate. This structure is a starting point, not a rulebook.

The most difficult decision is when something is a **feature** or a **part**. This 
one will drive you a little crazy sometimes. Just know getting this wrong is okay. You
can always move things around. 

### BUT, IS IT A FEATURE?

My litmus testForActive for whether something is a **feature** or a **part** is to ask
myself if someone looking at the current element would think of this new thing as a
thing as a fundamental part of the current element. If the answer is yes, it's a
**feature**. 

Using an example may help. Imagine we already have a feature called `menu-bar`. We
decide to add a new button to the menu bar. Is the button a **feature** or a
**part**? If there are 10 buttons on the menu bar a user wouldn't likely think
of each button as a fundamental part of the menu bar. But them **MAY** think of the 
collection of them as a feature. So, the button is a **part** and the collection
of buttons is a **feature**. Maybe. Sorry.


## Example

Here is an example of a possible directory structure for a social media:


```
src/
├── common/
│   ├── Button.tsx
│   ├── InputField.tsx
│   └── Modal.tsx
├── features/
│   ├── postManagement/
│   │   ├── features/
│   │   │   ├── postCreation/
│   │   │   │   ├── features/
│   │   │   │   │   └── image-uploader/
│   │   │   │   │       └── ImageUploader.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useForm.ts
│   │   │   │   ├── utils/
│   │   │   │   │   └── validation.ts
│   │   │   │   └── PostCreation.tsx
│   │   │   └── postDetail/
│   │   │       ├── features/
│   │   │       │   └── profile-card/
│   │   │       │       └── ProfileCard.tsx
│   │   │       └── PostDetail.tsx
│   │   ├── hooks/
│   │   │   └── usePostSearch.ts
│   │   └── PostManagement.tsx
│   └── userProfile/
│       ├── common/
│       │   ├── ProfileCard.tsx
│       │   └── SettingsForm.tsx
│       ├── features/
│       │   ├── userSettings/
│       │   │   ├── hooks/
│       │   │   │   └── useSettingsForm.ts
│       │   │   └── UserSettings.tsx
│       │   └── userStatistics/
│       │       └── UserStatistics.tsx
│       ├── hooks/
│       │   └── useUserDetails.ts
│       ├── utils/
│       │   └── profileUtils.ts
│       └── UserProfile.tsx
├── hooks/
│   ├── useFetch.ts
│   └── useDebounce.ts
└── utils/
    ├── formatter.ts
    └── validator.ts
```