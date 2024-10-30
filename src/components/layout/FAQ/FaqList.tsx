import { EXT } from "src/constants/routes";

export const FaqList = [
  {
    question: "What's zkSync Ignite?",
    answer: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. <br />
        <br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        ipsum
      </>
    ),
    key: crypto.randomUUID(),
  },
  {
    question: "Why join the program?",
    answer: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. <br />
        <br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        ipsum
      </>
    ),
    key: crypto.randomUUID(),
  },
  {
    question: "How to participate?",
    answer: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. <br />
        <br />{" "}
        <a
          className="underlined"
          href={EXT.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord invitation
        </a>{" "}
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        ipsum
      </>
    ),
    key: crypto.randomUUID(),
  },
] as const;

export type FaqListType = typeof FaqList;
