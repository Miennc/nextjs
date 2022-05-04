import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { getProduct } from "../actions/product";

import { END } from "redux-saga";

import { wrapper } from "../store";
import { useRouter } from "next/dist/client/router";

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const goArticleHandle = () => {
    router.push({
      pathname: "/bai-viet/pho-ha-noi",
      query: {
        code: 123,
        title: "Pha Ha Noi",
        des: "mo tả về món phửo ha noi",
      },
    });
  };

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"
        />
      </Head>
      <div>
        <button onClick={() => goArticleHandle()}>click me</button>
        <Component />
      </div>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };
  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
