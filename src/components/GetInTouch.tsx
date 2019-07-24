import React from 'react';

export interface Props {
  linkedinUrl: string;
  githubUrl: string;
  emailAddress: string;
}

export default function GetInTouch(props: Props) {
  const { linkedinUrl, githubUrl, emailAddress } = props;

  return (
    <section className="mb-5">
      <h3>Get in touch!</h3>
      <ul>
        <li>
          Find me on <a href={linkedinUrl}>LinkedIn</a>
        </li>
        <li>
          Check out my <a href={githubUrl}>personal projects on Github</a>
        </li>
        <li>
          Reach me directly 💬 <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
        </li>
      </ul>
    </section>
  );
}
