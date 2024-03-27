import json from '@rollup/plugin-node-resolve'
import {dataToEsm} from '@rollup/pluginutils'

function myExample() {
    return {
        name: 'my-example',
        buildStart(options) {
            // console.log('buildStart options', options)
        },
        load(id) {
            console.log('load id', id)
            return null
        },
        transform(code, id) {
            if (id.slice(-5) !== '.json') {
                return null
            }
            try {
                const parsed = JSON.parse(code)
                const transformCode = dataToEsm(parsed)
                console.log(transformCode)
                return {
                    code: transformCode
                }
            }catch (err) {
                console.log(err.message)
            }
            // console.log('transform code', code)
            // console.log('transform id', id)
        },
        buildEnd(err) {
            console.log('buildEnd err', err)
        }
    }
}

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es'
    },
    plugins: [
        myExample()
    ]
}
