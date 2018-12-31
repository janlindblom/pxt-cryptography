class TEA {
    /**
     * Tiny Encryption Algorithm by David Wheeler and Roger Needham.
     * 
     * Ported from C reference code.
     */
    static encrypt(v: number[], k: number[]): number[] {
        // setup
        let v0: number = v[0]
        let v1: number = v[1]
        let sum: number = 0
        // a key schedule constant
        let delta: number = 2654435769
        // cache key
        let k0: number = k[0]
        let k1: number = k[1]
        let k2: number = k[2]
        let k3: number = k[3]
        // basic cycle start
        for (let i = 0; i < 32; i++) {
            sum += delta
            v0 += ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1)
            v1 += ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3)
        } // end cycle
        v[0] = v0
        v[1] = v1
        return v
    }

    static decrypt(v: number[], k: number[]): number[] {
        // set up; sum is 32* delta
        let v0: number = v[0]
        let v1: number = v[1]
        let sum: number = 3337565984
        // a key schedule constant
        let delta: number = 2654435769
        // cache key
        let k0: number = k[0]
        let k1: number = k[1]
        let k2: number = k[2]
        let k3: number = k[3]
        // basic cycle start
        for (let i = 0; i < 32; i++) {
            v1 -= ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3)
            v0 -= ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1)
            sum -= delta
        } // end cycle
        v[0] = v0
        v[1] = v1
        return v
    }
}

//% block
namespace crypto {
    namespace tea {
        export function encrypt(v: number[], k: number[]): number[] {
            return TEA.encrypt(v, k)
        }
    }
} 