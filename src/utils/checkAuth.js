import { check } from "../api/loginAPI";

const props = { props: {} };

export default async function getServerSideProps(ctx) {
  try {
    const { data } = await check();
    console.log(data);
    return {
      props: { name: data.name },
    };
  } catch (err) {
    console.log(err);
    return props;
  }
}
