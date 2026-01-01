const accordionCode = `
<Accordion openType="single" defaultValue="item-1" theme="modern">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is TWJ UI?</AccordionTrigger>
        <AccordionContent>
          TWJ UI is a theme-aware, animation-ready UI toolkit that refuses to be mid.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Does it support multiple themes?</AccordionTrigger>
        <AccordionContent>
          Absolutely. Modern, Brutalist, Elegant, Futuristic — it bends to your aesthetic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is the accordion animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Smooth motion via <code>motion/react</code>. Zero jank, all swagger.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
`

export default accordionCode;