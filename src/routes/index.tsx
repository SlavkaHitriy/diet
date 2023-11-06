import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from '@builder.io/qwik-city';


export const onRequest: RequestHandler = async ({redirect, url, cookie}) => {
  if(!cookie.get('Refresh-Token')){
    throw redirect(308, new URL('/auth/login/', url).toString());
  }
};



export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
  
};
