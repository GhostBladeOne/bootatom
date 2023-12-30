import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory, ECPairAPI, TinySecp256k1Interface } from 'ecpair';
const bitcoin = require('bitcoinjs-lib');
bitcoin.initEccLib(ecc);
import {
  initEccLib,
} from "bitcoinjs-lib";
import { logBanner, prepareArgsMetaCtx } from "./command-helpers";
import { getKeypairInfo } from "../utils/address-keypair-path";
import { checkBaseRequestOptions, decorateAtomical } from "../utils/atomical-format-helpers";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { AtomicalOperationBuilder } from "../utils/atomical-operation-builder";
const tinysecp: TinySecp256k1Interface = require('tiny-secp256k1');
initEccLib(tinysecp as any);
const ECPair: ECPairAPI = ECPairFactory(tinysecp);
export class MintInteractiveDftCommand implements CommandInterface {
  constructor(
    private electrumApi: ElectrumApiInterface,
    private options: BaseRequestOptions,
    private address: string,
    private ticker: string,
    private fundingWIF: string,
  ) {
    this.options = checkBaseRequestOptions(this.options)
    this.ticker = this.ticker.startsWith('$') ? this.ticker.substring(1) : this.ticker;
  }
  async run(): Promise<any> {

    // Prepare the keys
    const keypairRaw = ECPair.fromWIF(
      this.fundingWIF,
    );
    const keypair = getKeypairInfo(keypairRaw);
    
    const filesData: any[] = await prepareArgsMetaCtx(
      {
        mint_ticker: this.ticker,
      }, undefined, undefined)

    // logBanner('Mint Interactive FT (Decentralized)');
    // console.log("Atomical type:", 'FUNGIBLE (decentralized)', filesData, this.ticker);
    // console.log("Mint for ticker: ", this.ticker);

    // const atomicalIdResult = await this.electrumApi.atomicalsGetByTicker(this.ticker);
    // const atomicalResponse = await this.electrumApi.atomicalsGetFtInfo(atomicalIdResult.result.atomical_id);

      // console.log('[atomicalResponse]:',atomicalResponse.result ,atomicalResponse.result );

//     const atomicalResponse = {
//   global: {
//     coin: 'Bitcoin',
//     network: 'mainnet',
//     height: 823563,
//     block_tip: '000000000000000000005eba9a66a50e6120264b5b5e9f315286e0b56fc89505',
//     server_time: '2023-12-30T14:30:06.331287',
//     atomicals_block_tip: '691427dc41294f222da572e73b232fd980efa544b6e4b5b863080fcfb9618d05',
//     atomical_count: 162798,
//     atomicals_block_hashes: {
//       '823554': '10c6cdcf9bbb9732358f5202ef0670b3e5679a47da2f4eef02808ac9fdee30d2',
//       '823555': '2bb6c5e297d1a3222cc974a5736b897df6c337d618cf7bd86cc4dad35ec39868',
//       '823556': '8d7383cf4d7fc2ff8adb4718495eabef539c93b06cd8f6f641c5befdc9c26dd5',
//       '823557': 'ac7d10c599476741489ca39ba09a07f0082dbc099482c7ab9d123dc81a31ca1a',
//       '823558': '94dfd30a96153f6065f1664e25d9f12a3c26b4845479bd9453369d6b4866ba2b',
//       '823559': 'bd10cf2c4eca5bdc5c46692decdc0cde020c37e935f534fa042ed60611c65ba1',
//       '823560': '1c811310e81b5c411a38d39e1875ac9a39baf7ef4fead600a6f5254dd941465c',
//       '823561': 'f21ac9f0c9722f0a5909a0295fa6f2a8a32e8744d4b804f064d347a9ad6808ef',
//       '823562': 'dee23efb7b04abd3970c9ac2d9c2bb68f1e100a4c65b5cd95beab1a80cda654f',
//       '823563': '691427dc41294f222da572e73b232fd980efa544b6e4b5b863080fcfb9618d05'
//     }
//   },
//   result: {
//     atomical_id: '9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0',
//     atomical_number: 149087,
//     atomical_ref: 'j4jz0eyfjcjzc1rqcawtxr0b8rd0pgzd2ny36vheh7g7yhzadxk0i0',
//     type: 'FT',
//     confirmed: true,
//     mint_info: {
//       commit_txid: '9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66',
//       commit_index: 0,
//       commit_location: '9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0',
//       commit_tx_num: 45334352,
//       commit_height: 822588,
//       reveal_location_txid: '52630dfdf64ffd86530aff709ccc4ae0fc92ba371afd64b07484c24a8997f04e',
//       reveal_location_index: 0,
//       reveal_location: '52630dfdf64ffd86530aff709ccc4ae0fc92ba371afd64b07484c24a8997f04ei0',
//       reveal_location_tx_num: 45334353,
//       reveal_location_height: 822588,
//       reveal_location_header: '00200020c47c1dedff2e246d5f3e850c5f0c9b9201484381bb4e00000000000000000000608de91a0401a66bf274017f95d6e8a9ef01a99f1a51cedb7f94d297049eab7c50fc8665b3e803170664697b',
//       reveal_location_blockhash: '1a0b6d566cc3bff770b4d820eb6666c6b77908fba24500000000000000000000',
//       reveal_location_scripthash: '49f0166aaf44de971a77b8b5be97fd714047617e3fdd99b5fa12639eed5b3eb4',
//       reveal_location_script: '5120c2cf5debd37065bab8680df11745c7cf2286a0470e4e0ecb14831eb631ae6d4a',
//       reveal_location_value: 1000,
//       args: [Object],
//       meta: [Object],
//       ctx: {},
//       '$mint_bitworkc': 'aabbcc',
//       '$request_ticker': 'quark',
//       '$bitwork': [Object]
//     },
//     subtype: 'decentralized',
//     '$max_supply': 10000000000,
//     '$mint_height': 809521,
//     '$mint_amount': 20000,
//     '$max_mints': 500000,
//     '$mint_bitworkc': 'aabbcc',
//     '$bitwork': { bitworkc: '9125', bitworkr: null },
//     '$ticker_candidates': [ [Object] ],
//     '$request_ticker_status': {
//       status: 'verified',
//       verified_atomical_id: '9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0',
//       note: 'Successfully verified and claimed ticker for current Atomical'
//     },
//     '$request_ticker': 'quark',
//     '$ticker': 'quark',
//     mint_data: { fields: [Object] },
//     dft_info: { mint_count: 211982 },
//     location_summary: { unique_holders: 10316, circulating_supply: 4221740403 }
//   }
// }

    // console.log('[atomicalResponse]:',JSON.stringify(atomicalResponse));
    // const globalInfo = atomicalResponse.global;
    // const atomicalInfo = atomicalResponse.result;
    const globalInfo = {"coin":"Bitcoin","network":"mainnet","height":823563,"block_tip":"000000000000000000005eba9a66a50e6120264b5b5e9f315286e0b56fc89505","server_time":"2023-12-30T14:27:46.258887","atomicals_block_tip":"691427dc41294f222da572e73b232fd980efa544b6e4b5b863080fcfb9618d05","atomical_count":162798,"atomicals_block_hashes":{"823554":"10c6cdcf9bbb9732358f5202ef0670b3e5679a47da2f4eef02808ac9fdee30d2","823555":"2bb6c5e297d1a3222cc974a5736b897df6c337d618cf7bd86cc4dad35ec39868","823556":"8d7383cf4d7fc2ff8adb4718495eabef539c93b06cd8f6f641c5befdc9c26dd5","823557":"ac7d10c599476741489ca39ba09a07f0082dbc099482c7ab9d123dc81a31ca1a","823558":"94dfd30a96153f6065f1664e25d9f12a3c26b4845479bd9453369d6b4866ba2b","823559":"bd10cf2c4eca5bdc5c46692decdc0cde020c37e935f534fa042ed60611c65ba1","823560":"1c811310e81b5c411a38d39e1875ac9a39baf7ef4fead600a6f5254dd941465c","823561":"f21ac9f0c9722f0a5909a0295fa6f2a8a32e8744d4b804f064d347a9ad6808ef","823562":"dee23efb7b04abd3970c9ac2d9c2bb68f1e100a4c65b5cd95beab1a80cda654f","823563":"691427dc41294f222da572e73b232fd980efa544b6e4b5b863080fcfb9618d05"}}
    const atomicalInfo = {"atomical_id":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0","atomical_number":149087,"atomical_ref":"j4jz0eyfjcjzc1rqcawtxr0b8rd0pgzd2ny36vheh7g7yhzadxk0i0","type":"FT","confirmed":true,"mint_info":{"commit_txid":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66","commit_index":0,"commit_location":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0","commit_tx_num":45334352,"commit_height":822588,"reveal_location_txid":"52630dfdf64ffd86530aff709ccc4ae0fc92ba371afd64b07484c24a8997f04e","reveal_location_index":0,"reveal_location":"52630dfdf64ffd86530aff709ccc4ae0fc92ba371afd64b07484c24a8997f04ei0","reveal_location_tx_num":45334353,"reveal_location_height":822588,"reveal_location_header":"00200020c47c1dedff2e246d5f3e850c5f0c9b9201484381bb4e00000000000000000000608de91a0401a66bf274017f95d6e8a9ef01a99f1a51cedb7f94d297049eab7c50fc8665b3e803170664697b","reveal_location_blockhash":"1a0b6d566cc3bff770b4d820eb6666c6b77908fba24500000000000000000000","reveal_location_scripthash":"49f0166aaf44de971a77b8b5be97fd714047617e3fdd99b5fa12639eed5b3eb4","reveal_location_script":"5120c2cf5debd37065bab8680df11745c7cf2286a0470e4e0ecb14831eb631ae6d4a","reveal_location_value":1000,"args":{"mint_amount":20000,"mint_height":809521,"max_mints":500000,"mint_bitworkc":"aabbcc","request_ticker":"quark","bitworkc":"9125","nonce":"38003492","time":1703345000},"meta":{"name":"QUARK","description":"one of the most basic forms of matter that make up the heavier elementary particles ","legal":{"terms":"Atoms are made up of smaller particles - protons , neutrons and electrons - some of which are made up of even smaller ones , called quarks."}},"ctx":{},"$mint_bitworkc":"aabbcc","$request_ticker":"quark","$bitwork":{"bitworkc":"9125","bitworkr":null}},"subtype":"decentralized","$max_supply":10000000000,"$mint_height":809521,"$mint_amount":20000,"$max_mints":500000,"$mint_bitworkc":"aabbcc","$bitwork":{"bitworkc":"9125","bitworkr":null},"$ticker_candidates":[{"tx_num":45334352,"atomical_id":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0","txid":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66","commit_height":822588,"reveal_location_height":822588}],"$request_ticker_status":{"status":"verified","verified_atomical_id":"9125f03bcf9325f6071762b9aee00b461a0b43ed157c336e2e89e07f47ea6f66i0","note":"Successfully verified and claimed ticker for current Atomical"},"$request_ticker":"quark","$ticker":"quark","mint_data":{"fields":{"args":{"mint_amount":20000,"mint_height":809521,"max_mints":500000,"mint_bitworkc":"aabbcc","request_ticker":"quark","bitworkc":"9125","nonce":"38003492","time":1703345000},"meta":{"name":"QUARK","description":"one of the most basic forms of matter that make up the heavier elementary particles ","legal":{"terms":"Atoms are made up of smaller particles - protons , neutrons and electrons - some of which are made up of even smaller ones , called quarks."}}}},"dft_info":{"mint_count":211180},"location_summary":{"unique_holders":10284,"circulating_supply":4205700403}}
    const atomicalDecorated = decorateAtomical(atomicalInfo);


    if (!atomicalDecorated['$ticker'] || atomicalDecorated['$ticker'] != this.ticker) {
      throw new Error('Ticker being requested does not match the initialized decentralized FT mint: ' + atomicalDecorated)
    }

    if (!atomicalDecorated['subtype'] || atomicalDecorated['subtype'] != 'decentralized') {
      throw new Error('Subtype must be decentralized fungible token type')
    }

    if (atomicalDecorated['$mint_height'] > (globalInfo['height'] + 1)) {
      throw new Error(`Mint height is invalid. height=${globalInfo['height']}, $mint_height=${atomicalDecorated['$mint_height']}`)
    }
    const perAmountMint = atomicalDecorated['$mint_amount'];
    if (perAmountMint <= 0 || perAmountMint >= 100000000) {
      throw new Error('Per amount mint must be > 0 and less than or equal to 100,000,000')
    }
    console.log("Per mint amount:", perAmountMint);

    if (!atomicalDecorated['dft_info']) {
      throw new Error(`General error no dft_info found`)
    }

    const max_mints = atomicalDecorated['$max_mints']
    const mint_count = atomicalDecorated['dft_info']['mint_count'];
    const ticker = atomicalDecorated['$ticker'];
    if (atomicalDecorated['dft_info']['mint_count'] >= atomicalDecorated['$max_mints']) {
      throw new Error(`Decentralized mint for ${ticker} completely minted out!`)
    } else {
      console.log(`There are already ${mint_count} mints of ${ticker} out of a max total of ${max_mints}.`)
    }
 
    // console.log('atomicalDecorated', atomicalResponse, atomicalDecorated);
    const atomicalBuilder = new AtomicalOperationBuilder({
      electrumApi: this.electrumApi,
      rbf: this.options.rbf,
      satsbyte: this.options.satsbyte,
      address: this.address,
      disableMiningChalk: this.options.disableMiningChalk,
      opType: 'dmt',
      dmtOptions: {
        mintAmount: perAmountMint,
        ticker: this.ticker,
      },
      meta: this.options.meta,
      ctx: this.options.ctx,
      init: this.options.init,
    });

    // Attach any default data
    // Attach a container request
    if (this.options.container)
      atomicalBuilder.setContainerMembership(this.options.container);

    // Attach any requested bitwork OR automatically request bitwork if the parent decentralized ft requires it
    const mint_bitworkc = atomicalDecorated['$mint_bitworkc'] || this.options.bitworkc
    if (mint_bitworkc) {
      atomicalBuilder.setBitworkCommit(mint_bitworkc);
    }

    const mint_bitworkr = atomicalDecorated['$mint_bitworkr'] || this.options.bitworkr
    if (mint_bitworkr) {
      atomicalBuilder.setBitworkReveal(mint_bitworkr);
    }

    // The receiver output of the deploy
    atomicalBuilder.addOutput({
      address: this.address,
      value: perAmountMint
    })

    const result = await atomicalBuilder.start(this.fundingWIF);
    return {
      success: true,
      data: result
    }
  }

}