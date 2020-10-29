import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface Props {
  data: {
    title?: string;
    description?: string;
    canonical?: string;
  };
}

const Meta: FC<Props> = ({ data }) => {
  const title = data.title;
  const description = data.description;
  const canonical = `https://corona-live.com/${data.canonical}`;

  return (
    <Helmet titleTemplate="%s">
      <title>{title}</title>
      {description ? (
        <meta name="description" content={description} data-react-helmet="true" />
      ) : null}
      {canonical ? <link rel="canonical" href={canonical} data-react-helmet="true" /> : null}

      <meta property="og:title" content={title} data-react-helmet="true" />
      {description ? (
        <meta property="og:description" content={description} data-react-helmet="true" />
      ) : null}
      {canonical ? <meta property="og:url" content={canonical} data-react-helmet="true" /> : null}

      <meta name="twitter:title" content={title} data-react-helmet="true" />
      {description ? (
        <meta name="twitter:description" content={description} data-react-helmet="true" />
      ) : null}
    </Helmet>
  );
};

export default Meta;
