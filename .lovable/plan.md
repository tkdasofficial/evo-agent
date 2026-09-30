# Refine the mobile workspace views

## What I’ll build
- Match the uploaded **Agent**, **Tools**, and **Tasks** mobile layouts while keeping Evo Agent’s current charcoal theme and Manrope typography.
- Turn the workspace header into a compact three-state control matching the references: Agent/project, Tools, and Tasks.
- Refine **Tools** into a scrollable cloud-tools list with icon, title, description, search field, and the existing bottom application controls.
- Build the **Tasks** state with Ready, Active, and Draft groups, empty-state panels, and a fixed “New task” control.
- Refine the **Agent** conversation spacing, action chips, composer, and bottom application controls to match the reference proportions.
- Make each action summary tappable. It will smoothly expand into a vertical activity list, change to “Show less,” and collapse back without shifting unrelated controls.

## Interaction details
- Only one action history opens at a time.
- Expanded rows use realistic UI-only mock actions such as opened files, generated assets, and verification steps.
- Chevron direction, label, accessibility state, and keyboard activation follow the open/closed state.
- Motion is subtle and disabled when the device requests reduced motion.

## Scope
- UI and local interaction state only.
- No task execution, cloud connection, persistence, or backend workflow will be added.

## Validation
- Check all three states at the current 360×629 mobile size.
- Verify action expand/collapse, Tools search, Tasks layout, composer, and bottom controls.
- Confirm no page, console, or build errors.
