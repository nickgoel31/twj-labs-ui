import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
// Import your new custom component
import { CustomCodeBlock } from '@/components/docs/custom-code-block';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
    // Replace the default pre with your CustomCodeBlock
    pre: CustomCodeBlock, 
  };
}