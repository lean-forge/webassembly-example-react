import React, { useState } from "react";
// Import @wasmer - dependencies
import { WASI } from "@wasmer/wasi";
import { WasmFs } from "@wasmer/wasmfs";

const wasmFilePath = "./add.wasm";

const Add = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [result, setResult] = useState(0);

  const wasmFs = new WasmFs();

  let wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs: wasmFs.fs,
    },
  });

  const loadWasm = async () => {
    const response = await fetch(wasmFilePath);
    const wasmBinary = await response.arrayBuffer();

    // Create the WASM instance
    const { instance }: any = await WebAssembly.instantiate(wasmBinary, {
      wasi_snapshot_preview1: wasi.wasiImport,
    });
    // Get the exported function
    const addFn = instance.exports.add;
    setResult(addFn(first, second));
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    loadWasm();
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <table>
          <tr>
            <td>
              <input
                type="number"
                name="first"
                value={first}
                onChange={(e: any) => setFirst(e.target.value)}
              />
            </td>
            <td>
              <p>+</p>
            </td>
            <td>
              <input
                type="number"
                name="second"
                value={second}
                onChange={(e: any) => setSecond(e.target.value)}
              />
            </td>
            <td>
              <p>=</p>
            </td>
            <td>{result}</td>
            <td>
              <input type="submit" value="Add" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Add;
