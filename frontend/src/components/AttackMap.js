import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

const geoUrl =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function AttackMap({ threats = [] }) {
  console.log('THREATS:', threats);

  const coordinates = {
    Australia: [133.7751, -25.2744],
    Russia: [105.3188, 61.524],
    China: [104.1954, 35.8617],
    'North Korea': [127.5101, 40.3399],
    Localhost: [77.1025, 28.7041],
Internal: [78.9629, 20.5937]
  };

  return (

    <div className="
      mt-8
      bg-[#111827]
      border
      border-slate-800
      rounded-3xl
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            Global Attack Surface
          </h1>

          <p className="
            text-slate-400
            mt-2
          ">
            Real-time attack origin tracking
          </p>

        </div>

      </div>

      <div className="
        bg-[#020817]
        border
        border-slate-800
        rounded-3xl
        p-4
      ">

        <ComposableMap
          projectionConfig={{
            scale: 145
          }}
          style={{
            width: '100%',
            height: '600px'
          }}
        >

          <Geographies geography={geoUrl}>

            {({
              geographies
            }) =>
              geographies.map((geo) => (

                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#172554"
                  stroke="#233554"
                  style={{
                    default: {
                      outline: 'none'
                    },
                    hover: {
                      fill: '#1e293b',
                      outline: 'none'
                    },
                    pressed: {
                      outline: 'none'
                    }
                  }}
                />

              ))
            }

          </Geographies>

          {threats.map((threat, index) => (

            <Marker
              key={index}
              coordinates={
                coordinates[
                  threat.country
                ] || [0, 0]
              }
            >

              <circle
                r={10}
                fill="#ef4444"
                stroke="#fff"
                strokeWidth={2}
              />

              <circle
                r={18}
                fill="#ef444455"
              />

            </Marker>

          ))}

        </ComposableMap>

      </div>

    </div>
  );
}

export default AttackMap;