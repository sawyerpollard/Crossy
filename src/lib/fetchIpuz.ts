import { Ipuz } from './types';

export default async function fetchIpuz(url: string): Promise<Ipuz | null> {
    try {
        const res = await fetch(url);
        const json = await res.json();
        const ipuz = json as Ipuz;
        return ipuz;
    } catch (error) {
        return null;
    }
}
