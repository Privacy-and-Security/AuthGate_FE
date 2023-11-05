import { JwtLoginView } from 'src/pages/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Jwt: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
