/**
 * The TEA class, for the Tiny Encryption Algorithm by David Wheeler and Roger Needham.
 * 
 * Inspiration and JavaScript source: https://github.com/chrisveness/crypto (c) Chris Veness 2002-2018
 */
class TEA {
    
    static encrypt(v: number[], k: number[]): number[] {
        // setup
        let v0: number = v[0]
        let v1: number = v[1]
        let sum: number = 0
        // a key schedule constant
        const delta = 0x9e3779b9
        // cache key
        let k0: number = k[0]
        let k1: number = k[1]
        let k2: number = k[2]
        let k3: number = k[3]
        // basic cycle start
        for (let i = 0; i < 32; i++) {
            sum += delta
            v0 += ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1)
            v1 += ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3)
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
            v1 -= ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3)
            v0 -= ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1)
            sum -= delta
        } // end cycle
        v[0] = v0
        v[1] = v1
        return v
    }

    /**
     * Converts string to array of numbers (each containing 4 chars).
     * @source https://github.com/chrisveness/crypto/blob/master/tea-block.js
     * @private
     */
    private static stringToNumbers(s: string): number[] {
        const l: number[] = []
        for (let i = 0; i < Math.ceil(s.length); i++) {
            l[i] = s.charCodeAt(i)
        }
        return l
    }

    /**
     * Converts array of numbers to string.
     * @source https://github.com/chrisveness/crypto/blob/master/tea-block.js
     * @private
     */
    static numbersToString(l: number[]): string {
        let str = "";
        for (let i = 0; i < l.length; i++) {
            str += String.fromCharCode(l[i] & 0xff)
            str += String.fromCharCode(l[i] >>> 8 & 0xff)
            str += String.fromCharCode(l[i] >>> 16 & 0xff)
            str += String.fromCharCode(l[i] >>> 24 & 0xff)
        }
        return str
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