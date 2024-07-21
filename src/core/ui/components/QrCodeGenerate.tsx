import { useQRCode } from 'next-qrcode';

interface LogoProps {
  link: string;
  width: number;
}

interface ColorCodeProps {
  darkHex: string;
  lightHex: string;
}

interface QrCodeProps {
  link: string;
  margin?: number;
  scale?: number;
  width?: number;
  color?: ColorCodeProps;
  logo?: LogoProps;
  errorCorrectionLevel?:
    | 'low'
    | 'medium'
    | 'quartile'
    | 'high'
    | 'L'
    | 'M'
    | 'Q'
    | 'H';
}

function QrCodeGenerate({ ...props }: QrCodeProps) {
  const { Canvas } = useQRCode();

  return (
    <div className="h-full w-full">
      <Canvas
        text={props.link}
        options={{
          errorCorrectionLevel: 'L',
          margin: 0,
          quality: 0.3,
          scale: 1,
          width: 200,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        }}
        logo={{
          src: '',
          options: {
            width: 25,
            x: undefined,
            y: undefined,
          },
        }}
      />
    </div>
  );
}

export default QrCodeGenerate;
