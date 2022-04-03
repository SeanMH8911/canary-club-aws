import { API, Storage } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import ReactMarkdown from "react-markdown";
import { listRentals, getRental } from "../../graphql/queries";
import "../../configureAmplify";

export default function Post({ rental }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">
        {rental.title}
      </h1>

      <div className="mt-8">
        {/* <ReactMarkdown className="prose" children={rental.description} /> */}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listRentals,
  });
  const paths = postData.data.listRentals.items.map((rental) => ({
    params: { id: rental.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postData = await API.graphql({
    query: getRental,
    variables: { id },
  });
  return {
    props: {
      rental: postData.data.getRental,
    },
    revalidate: 1,
  };
}
