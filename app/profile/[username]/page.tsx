type Props = {
  params: { username: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>Welcome back {params.username} </h2>
    </div>
  );
}
