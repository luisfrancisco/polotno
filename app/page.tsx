'use client';
import React from 'react';
// import '/components/blueprint.css';
// import './page.css';

import dynamic from 'next/dynamic';
const Editor = dynamic<{ templateVariables: typeof templateVars, templateName: string }>(() => import('../components/editor'), {
  ssr: false,
});

export default function IndexPage() {
  const [templateVars, setTemplateVars] = React.useState({
    title:"REY DAVID",
    short_description: "The collective is stronger than the individual. In the civilization of Àiyé, these words hold true. They prioritize harmony amongst their people, resulting in a strong and powerful society.",
    long_description: "<p>On each turn players sow seeds on a mancala of cards, performing actions of the last sowed card column. New cards can be acquired by spending seeds to improve the mancala. Character cards offer different actions and victory points while Mask cards give players new scoring conditions. \u0003Expanding the mancala with new columns also grants extra points at the end of the game.</p>"
  });

  const [templateName, setTemplateName] = React.useState<string | null>(null);

  return (
    <div>
      <Editor templateVariables={templateVars} templateName={templateName || 'sellsheet2'}/>
    </div>
  );
}