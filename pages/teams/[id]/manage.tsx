import Header from '~/components/Header';
import { getUser } from '~/utils/auth';

type Props = {
  pageProps: object;
};

type Context = {
  query: {
    id: string;
  };
};

const Manage = (props: Props) => {
  return (
    <>
      <Header pageProps={props?.pageProps} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">My Details</h2>
                </div>
                <hr />
                <div>
                  <p>
                    <strong>Name:</strong> 
                  </p>
                  <p>
                    <strong>Email:</strong> 
                  </p>
                </div>
                <br />
                <button className="button has-text-weight-bold" disabled>
                  Manage Details
                </button>
              </div>
            </div>
            <br />
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(ctx: Context) {
  // Check user's session
  const session = getUser(ctx);
  const id = ctx.query.id;

  return {
    props: { id, ...session },
  };
}

export default Manage;
