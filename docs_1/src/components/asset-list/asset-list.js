import React, { useEffect, useState } from 'react';
import Asset from '../asset/asset';
import assetListJSON from "../../data/list-all-assets.json";
import assetIconsJSON from "../../data/list-all-asset-icons.json";

const ASSET_SYMBOLS = ['BTC', 'ETH', 'LINK', 'ADA', 'MATIC'];

export default function AssetList(props) {
   const [assetList, setAssetList] = useState([]);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setAssetList(assetListJSON);
      setLoading(false);
      setError(false);

   // Commented out due to rate limiting
   //    fetch(`https://rest.coinapi.io/v1/assets?filter_asset_id=${ASSET_SYMBOLS.join(",")}`, {
   //       headers: {
   //          'X-CoinAPI-Key': '8862BDA4-E571-49DA-87AC-3FBB99402385',
   //       },
   //    })
   //       .then((response) => response.json())
   //       .then((data) => {
   //          setAssetList(data);
   //          setLoading(false);
   //       })
   //       .catch((_error) => {
   //          setLoading(false);
   //          setError(true);
   //       });
   }, [assetList]);

   let content = <></>;
   if (error) {
      content = <h1>ERROR</h1>;
   }

   if (!error && !loading && assetList.length !== 0) {
      content = (
         <>
            <h2>Assets</h2>
            {ASSET_SYMBOLS.map((symbol, index) => {
               const assetData = assetList.find(
                  (asset) => asset.asset_id === symbol
               );
               
               const iconData = assetIconsJSON.find(
                  (assetIcon) => assetIcon.asset_id === symbol
               );

               return <Asset key={index} asset={assetData} imgUrl={iconData.url}></Asset>;
            })}
         </>
      );
   }

   return content;
}
