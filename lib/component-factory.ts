interface ComponentSpec {
  type: 'button' | 'input' | 'card';
  theme: 'modern' | 'brutalist' | 'organic';
  label: string;
}

export function generateReactCode(spec: ComponentSpec): string {
  // 1. Clean up data
  const safeLabel = spec.label || (spec.type === 'button' ? 'Click Me' : 'Label');
  
  // 2. Deterministic Templates
  // This is where you ensure the code is ALWAYS correct because you wrote it.
  
  if (spec.type === 'button') {
    return `import { Button } from '@/components/ui/button';

export default function Demo() {
  return (
    <Button 
      variant="primary" 
      theme="${spec.theme}" 
      label="${safeLabel}" 
    />
  );
}`;
  }

  if (spec.type === 'input') {
    return `import { Input } from '@/components/ui/input';

export default function Demo() {
  return (
    <Input 
      placeholder="Type here..." 
      theme="${spec.theme}" 
      label="${safeLabel}" 
    />
  );
}`;
  }

  if (spec.type === 'card') {
    return `import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Demo() {
  return (
    <Card theme="${spec.theme}" title="${safeLabel}">
      <p className="mb-4 text-sm opacity-70">
        This is a generated ${spec.theme} card.
        It is completely deterministic.
      </p>
      <Button theme="${spec.theme}" label="Action" />
    </Card>
  );
}`;
  }

  return `// Error: Unknown component type: ${spec.type}`;
}