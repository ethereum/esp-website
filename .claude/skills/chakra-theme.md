# Chakra UI Theme Skill

Extend and customize the ESP website's Chakra UI theme.

## When to Use

- Adding new colors or design tokens
- Customizing component styles
- Creating consistent UI patterns
- Debugging styling issues

## Theme Structure

```
src/theme/
├── index.ts           # Theme export and configuration
├── foundations/       # Design tokens
│   ├── colors.ts      # Color palette
│   ├── fonts.ts       # Typography
│   └── ...
└── components/        # Component style overrides
    ├── Button.ts
    ├── Input.ts
    └── ...
```

## Foundations

### Colors

Location: `src/theme/foundations/colors.ts`

```typescript
export const colors = {
  brand: {
    // Primary brand colors
    primary: '#...',
    secondary: '#...',

    // Semantic colors
    success: '#...',
    error: '#...',
    warning: '#...',

    // Background gradients
    newsletter: {
      bgGradient: 'linear(to-br, ...)'
    }
  }
};
```

Adding new colors:
```typescript
export const colors = {
  brand: {
    // ... existing
    newSection: {
      bg: '#f5f5f5',
      text: '#333333',
      accent: '#0066cc'
    }
  }
};
```

### Typography

Location: `src/theme/foundations/fonts.ts`

```typescript
export const fonts = {
  heading: '"Libre Franklin", sans-serif',
  body: '"Libre Franklin", sans-serif'
};
```

## Component Overrides

### Creating Component Styles

Location: `src/theme/components/[ComponentName].ts`

```typescript
import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  // Base styles applied to all variants
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md'
  },

  // Variant styles
  variants: {
    primary: {
      bg: 'brand.primary',
      color: 'white',
      _hover: {
        bg: 'brand.primaryDark'
      }
    },
    secondary: {
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'brand.primary'
    }
  },

  // Size variants
  sizes: {
    lg: {
      h: '56px',
      fontSize: 'lg',
      px: '32px'
    }
  },

  // Default variant and size
  defaultProps: {
    variant: 'primary',
    size: 'md'
  }
});
```

### Register in Theme

Add to `src/theme/index.ts`:

```typescript
import { Button } from './components/Button';

export const theme = extendTheme({
  // ... foundations
  components: {
    Button,
    // ... other components
  }
});
```

## Form-Specific Styles

### Input Fields

Standard input height is 56px:

```typescript
export const Input = defineStyleConfig({
  variants: {
    outline: {
      field: {
        h: '56px',
        borderColor: 'gray.300',
        _focus: {
          borderColor: 'brand.primary',
          boxShadow: '0 0 0 1px brand.primary'
        }
      }
    }
  }
});
```

### Form Container

Gradient background pattern:

```typescript
<Box
  bg="brand.newsletter.bgGradient"
  p={{ base: 6, md: 8 }}
  borderRadius="lg"
>
  {/* Form content */}
</Box>
```

## Responsive Design

Use Chakra's responsive object syntax:

```typescript
// Base (mobile) → md (tablet) → lg (desktop)
<Box
  p={{ base: 4, md: 6, lg: 8 }}
  fontSize={{ base: 'sm', md: 'md' }}
/>
```

Common breakpoint patterns in this codebase:
- `base` / `md` - Two-step responsive (mobile/desktop)
- Spacing: 4 → 6 or 6 → 8
- Font sizes: sm → md or md → lg

## Using Theme Values

### In Components

```typescript
import { useTheme } from '@chakra-ui/react';

const MyComponent = () => {
  const theme = useTheme();
  const primaryColor = theme.colors.brand.primary;
};
```

### In Style Props

```typescript
<Box
  bg="brand.primary"           // Direct token reference
  color="gray.700"             // Chakra default colors
  spacing={8}                  // Theme spacing scale
/>
```

## Common Patterns

### Section Spacing

```typescript
<Stack spacing={8}>           // Between major sections
  <Stack spacing={6}>         // Between form fields
    <FormField />
  </Stack>
</Stack>
```

### Gradient Backgrounds

```typescript
<Box bgGradient="linear(to-br, purple.50, blue.50)" />
```

### Card Patterns

```typescript
<Box
  bg="white"
  p={6}
  borderRadius="lg"
  boxShadow="sm"
  border="1px solid"
  borderColor="gray.200"
/>
```

## Debugging Styles

1. **Check component override** - Is the component registered in theme?
2. **Check specificity** - Inline styles override theme styles
3. **Check variant** - Is the correct variant being used?
4. **Inspect with DevTools** - Check computed styles and class names

```typescript
// Debug: log theme values
console.log(theme.components.Button);
```
