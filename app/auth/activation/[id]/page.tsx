type Props = {
  params: {
    id: string;
  };
};

export default async function Activation({ params }: Props) {
  return (
    <>
      <h1>activationm page</h1>
      <h3>{params.id}</h3>
    </>
  );
}
