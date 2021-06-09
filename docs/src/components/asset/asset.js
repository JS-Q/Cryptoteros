import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function Asset({ asset: assetData, imgUrl }) {
   const [asset, setAsset] = useState({});
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setAsset(assetData);
      setLoading(false);
      setError(false);
   }, [assetData]);

   let content = <></>;
   if (error) {
      content = <h1>ERROR</h1>;
   }

   if (!error && !loading && Object.keys(asset).length !== 0) {
      content = (
         <>
            <h2>{asset.asset_id}</h2>
            <p>Price: {asset.price_usd}</p>
            <img
              src={imgUrl}
            //   src={require(`../../data/images/${assetData.asset_id.toLowerCase()}.png`)}
              alt={`${assetData.asset_id} logo`}
              height="50"
              >
            </img>
         </>
      );
   }
   return content;
}

Asset.propTypes = {
   symbol: PropTypes.string,
};
