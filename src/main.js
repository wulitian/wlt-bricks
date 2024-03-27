import {version} from '../package.json'
import hello from 'hello'

document.getElementById('root').innerHTML = hello('wlt') + version;
