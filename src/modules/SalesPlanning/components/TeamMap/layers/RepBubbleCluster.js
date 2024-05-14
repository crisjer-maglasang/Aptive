import { renderToStaticMarkup } from 'react-dom/server';
import {
  Marker,
  Tooltip,
} from 'react-leaflet';
import { divIcon } from 'leaflet';
import { addFsExcludeClass } from '@/lib/utils';

const RepBubbleCluster = ({
  lat,
  lng,
  reps,
}) => {
  const repCluster = [];
  const tau = Math.PI * 2;
  const phi = (Math.sqrt(5) + 1) / 2;
  const numOfReps = reps.length;
  for(let i = 0; i < numOfReps; i++) {
    const scaleFactor = (i <= 1) ? 45 : 30;
    const theta = i * tau / phi;
    const radius = Math.sqrt(i) * scaleFactor;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);

    const classes = addFsExcludeClass('rounded-full bg-gray-700 text-gray-100 w-9 h-9 flex items-center justify-center text-base');
    const iconMarkup = renderToStaticMarkup(
      <div style={{ zIndex: 600, visibility: 'visible', marginLeft: x, marginTop: y }} className={classes}>
        {reps[i].abbreviation}
      </div>,
    ).toString();

    repCluster.push(
      <Marker
        key={`rep-bubble-${Math.floor(Math.random() * Date.now())}`}
        position={[lat, lng]}
        icon={new divIcon({
          html: iconMarkup,
          className: 'rep-bubble-anchor',
        })}
        eventHandlers={{
          click: (e) => {
            // TODO - This will show the rep profile in the future. Keeping for reference.
            //console.log(reps[i].full_name + ' Clicked', e)
          },
        }}
      >
        <Tooltip className={addFsExcludeClass('rep-bubble-tooltip')} offset={[x + 14, y]} direction="top" opacity={1}>
          {reps[i].full_name}
        </Tooltip>
      </Marker>,
    );
  }

  return repCluster;
};

export default RepBubbleCluster;
