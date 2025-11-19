import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Link,
  Preview,
  Tailwind,
  pixelBasedPreset,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  email: string;
}

export default function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Ayo's next app</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className='bg-amber-300'>
          <Container>
            <Heading>Next app</Heading>
            <Link href='https://www.rewwind.co'>Ayo Now</Link>
            <p>Your email is {email}</p>
            <Button className='bg-cyan-700 text-white rounded-md border p-3 text-xs'>
              Click me
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
