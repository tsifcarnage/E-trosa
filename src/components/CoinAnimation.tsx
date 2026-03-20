import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function CoinAnimation() {
    return (
        <DotLottieReact
            src="/lottie/e-trosa-coin.json"
            loop={true}
            autoplay={true}
            style={{ width: '200px', height: '200px' }}
        />
    );
}