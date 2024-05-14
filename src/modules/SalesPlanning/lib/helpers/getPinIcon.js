import { sptConstants } from '../constants';

const {
  PIN_MOVER_TYPE,
  PIN_REFINANCED_TYPE,
  PIN_PREVIOUS_CUSTOMER_TYPE,
  PIN_UNQUALIFIED_TYPE,
  PIN_BLACK_TYPE,
  PIN_RED_CROSS_TYPE,
} = sptConstants;

export const getPinIcon = (iconStyles) => {
  const pinIcon = `
  <svg width='32' height='54' viewBox='0 0 32 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#markerShadow)'>
      <path d='M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z' fill='${iconStyles.fill}'/>
      <path d='M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z' stroke='${iconStyles.stroke}' stroke-width='2'/>
    </g>
    <defs>
      <filter id='markerShadow' x='0.00756836' y='0' width='31.9846' height='54' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
        <feFlood flood-opacity='0' result='BackgroundImageFix'/>
        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/>
        <feOffset dx='2' dy='4'/>
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/>
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1076_2695'/>
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1076_2695' result='shape'/>
      </filter>
    </defs>
  </svg>`;

  return getEncodedIcon(pinIcon);
};

export const getOutcomePinIcon = (iconData) => {
  let pinIcon = '';
  const { type, color, hasNote, fill, stroke } = iconData;

  if (color === PIN_RED_CROSS_TYPE) {
    if (hasNote) {
      pinIcon = `
        <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200340)">
              <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" fill="#F05252"/>
          </g>
          <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="#771D1D" stroke-width="2"/>
          <path d="M22 16.1028L19.8959 14L15.0007 18.8972L10.1041 14L8 16.1028L12.8967 21L8 25.8972L10.1041 28L15.0007 23.1043L19.8959 28L22 25.8972L17.1033 21L22 16.1028Z" fill="white"/>
          <rect x="18.7778" y="1.77783" width="12.4444" height="12.4444" rx="6.22222" fill="white"/>
          <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="#771D1D" stroke-width="2"/>
          <defs>
            <filter id="filter0_d_2326_200340" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200340"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200340" result="shape"/>
            </filter>
          </defs>
        </svg>`;
    } else {
      pinIcon = `
        <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200342)">
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="#F05252"/>
          </g>
          <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="#771D1D" stroke-width="2"/>
          <path d="M22 11.1028L19.8959 9L15.0007 13.8972L10.1041 9L8 11.1028L12.8967 16L8 20.8972L10.1041 23L15.0007 18.1043L19.8959 23L22 20.8972L17.1033 16L22 11.1028Z" fill="white"/>
          <defs>
            <filter id="filter0_d_2326_200342" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200342"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200342" result="shape"/>
            </filter>
          </defs>
        </svg>`;
    }

    return getEncodedIcon(pinIcon);
  }

  switch (type) {
    case PIN_MOVER_TYPE:
      if (hasNote) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200248)">
            <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path d="M15.6364 14.0637C15.285 13.7122 14.7151 13.7122 14.3637 14.0637L8.06365 20.3637C7.71218 20.7151 7.71218 21.285 8.06365 21.6364C8.41512 21.9879 8.98497 21.9879 9.33645 21.6364L9.60005 21.3728V27.3C9.60005 27.7971 10.003 28.2 10.5 28.2H12.3C12.7971 28.2 13.2 27.7971 13.2 27.3V25.5C13.2 25.003 13.603 24.6 14.1 24.6H15.9C16.3971 24.6 16.8 25.003 16.8 25.5V27.3C16.8 27.7971 17.203 28.2 17.7 28.2H19.5C19.9971 28.2 20.4 27.7971 20.4 27.3V21.3728L20.6637 21.6364C21.0151 21.9879 21.585 21.9879 21.9364 21.6364C22.2879 21.285 22.2879 20.7151 21.9364 20.3637L15.6364 14.0637Z" fill="${stroke}"/>
          <rect x="18.7778" y="1.77783" width="12.4444" height="12.4444" rx="6.22222" fill="white"/>
          <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="${stroke}" stroke-width="2"/>
          <defs>
            <filter id="filter0_d_2326_200248" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200248"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200248" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      } else {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200252)">
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path d="M15.6364 9.06365C15.2849 8.71218 14.7151 8.71218 14.3636 9.06365L8.06359 15.3637C7.71212 15.7151 7.71212 16.285 8.06359 16.6364C8.41506 16.9879 8.98491 16.9879 9.33638 16.6364L9.59999 16.3728V22.3C9.59999 22.7971 10.0029 23.2 10.5 23.2H12.3C12.797 23.2 13.2 22.7971 13.2 22.3V20.5C13.2 20.003 13.6029 19.6 14.1 19.6H15.9C16.397 19.6 16.8 20.003 16.8 20.5V22.3C16.8 22.7971 17.2029 23.2 17.7 23.2H19.5C19.997 23.2 20.4 22.7971 20.4 22.3V16.3728L20.6636 16.6364C21.0151 16.9879 21.5849 16.9879 21.9364 16.6364C22.2879 16.285 22.2879 15.7151 21.9364 15.3637L15.6364 9.06365Z" fill="${stroke}"/>
          <defs>
            <filter id="filter0_d_2326_200252" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200252"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200252" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      }

      break;
    case PIN_REFINANCED_TYPE:
      if (hasNote) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200232)">
            <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path d="M14.1544 22.94C14.4765 22.94 14.5168 22.98 14.6577 23.22L17.2752 28H21L18.3221 23.32C18.1007 22.92 17.9799 22.74 17.8188 22.46V22.42C19.3893 21.88 20.5973 20.52 20.5973 18.4C20.5973 16.02 19.0872 14 15.5235 14H9V28H12.2215V22.94H14.1544ZM12.2215 16.6H15.1208C16.5503 16.6 17.3154 17.34 17.3154 18.48C17.3154 19.6 16.5705 20.34 15.1208 20.34H12.2215V16.6Z" fill="${stroke}"/>
          <rect x="18.7778" y="1.77783" width="12.4444" height="12.4444" rx="6.22222" fill="white"/>
          <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="${stroke}" stroke-width="2"/>
          <defs>
            <filter id="filter0_d_2326_200232" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200232"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200232" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      } else {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200236)">
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path d="M14.1544 17.94C14.4765 17.94 14.5168 17.98 14.6577 18.22L17.2752 23H21L18.3221 18.32C18.1007 17.92 17.9799 17.74 17.8188 17.46V17.42C19.3893 16.88 20.5973 15.52 20.5973 13.4C20.5973 11.02 19.0872 9 15.5235 9H9V23H12.2215V17.94H14.1544ZM12.2215 11.6H15.1208C16.5503 11.6 17.3154 12.34 17.3154 13.48C17.3154 14.6 16.5705 15.34 15.1208 15.34H12.2215V11.6Z" fill="${stroke}"/>
          <defs>
            <filter id="filter0_d_2326_200236" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200236"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200236" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      }

      break;
    case PIN_PREVIOUS_CUSTOMER_TYPE:
      if (hasNote) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200240)">
            <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5347 26.6416C17.4257 27.5842 16.1505 28 14.7921 28C12.796 28 10.9109 27.1129 9.71881 25.7267C8.66535 24.5069 8 22.8436 8 21.0139C8 17.0495 10.9386 14 14.598 14C16.1228 14 17.4812 14.499 18.5347 15.3584V14.2772H22V27.7228H18.5347V26.6416ZM11.6039 21.0137C11.6039 23.1206 13.1287 24.6731 15.1524 24.6731C16.5108 24.6731 17.7029 24.0077 18.396 23.0097V18.9899C17.6475 17.9919 16.4554 17.3265 15.0693 17.3265C12.9623 17.3265 11.6039 19.0731 11.6039 21.0137Z" fill="${stroke}"/>
          <rect x="18.7778" y="1.77783" width="12.4444" height="12.4444" rx="6.22222" fill="white"/>
          <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="${stroke}" stroke-width="2"/>
          <defs>
            <filter id="filter0_d_2326_200240" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200240"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200240" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      } else {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2326_200244)">
          <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="${stroke}" stroke-width="2"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5347 21.6416C17.4257 22.5842 16.1505 23 14.7921 23C12.796 23 10.9109 22.1129 9.71881 20.7267C8.66535 19.5069 8 17.8436 8 16.0139C8 12.0495 10.9386 9 14.598 9C16.1228 9 17.4812 9.49901 18.5347 10.3584V9.27723H22V22.7228H18.5347V21.6416ZM11.6039 16.0137C11.6039 18.1206 13.1287 19.6731 15.1524 19.6731C16.5108 19.6731 17.7029 19.0077 18.396 18.0097V13.9899C17.6475 12.9919 16.4554 12.3265 15.0693 12.3265C12.9623 12.3265 11.6039 14.0731 11.6039 16.0137Z" fill="${stroke}"/>
          <defs>
            <filter id="filter0_d_2326_200244" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200244"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200244" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      }

      break;
    case PIN_UNQUALIFIED_TYPE:
      if (hasNote) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2326_200228)">
                <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z"  fill="${fill}"/>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.49316 35L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L24.5068 35H5.49316Z" fill="#D9D9D9"/>
            <path d="M5.49317 35V34H3.95633L4.57889 35.4051L5.49317 35ZM13.4416 52.9392L12.5273 53.3443L12.5323 53.3554L12.5374 53.3664L13.4416 52.9392ZM16.5584 52.9392L17.4626 53.3664L17.4678 53.3554L17.4727 53.3443L16.5584 52.9392ZM24.5068 35L25.4211 35.4051L26.0437 34H24.5068V35ZM4.57889 35.4051L12.5273 53.3443L14.3559 52.5341L6.40744 34.5949L4.57889 35.4051ZM12.5374 53.3664C12.9886 54.3212 13.9114 55 15 55V53C14.7863 53 14.512 52.8639 14.3458 52.512L12.5374 53.3664ZM15 55C16.0886 55 17.0114 54.3212 17.4626 53.3664L15.6542 52.512C15.488 52.8639 15.2137 53 15 53V55ZM17.4727 53.3443L25.4211 35.4051L23.5926 34.5949L15.6441 52.5341L17.4727 53.3443ZM24.5068 34H5.49317V36H24.5068V34Z" fill="${stroke}"/>
            <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="${stroke}" stroke-width="2"/>
            <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" fill="white" stroke="#1C64F2" stroke-width="2"/>
            <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="${stroke}" stroke-width="2"/>
            <defs>
              <filter id="filter0_d_2326_200228" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2" dy="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200228"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200228" result="shape"/>
              </filter>
            </defs>
          </svg>`;
      } else {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2326_200230)">
                <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="${fill}"/>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.49316 30L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L24.5068 30H5.49316Z" fill="#D9D9D9"/>
            <path d="M5.49317 30V29H3.95633L4.57889 30.4051L5.49317 30ZM13.4416 47.9392L12.5273 48.3443L12.5323 48.3554L12.5374 48.3664L13.4416 47.9392ZM16.5584 47.9392L17.4626 48.3664L17.4678 48.3554L17.4727 48.3443L16.5584 47.9392ZM24.5068 30L25.4211 30.4051L26.0437 29H24.5068V30ZM4.57889 30.4051L12.5273 48.3443L14.3559 47.5341L6.40744 29.5949L4.57889 30.4051ZM12.5374 48.3664C12.9886 49.3212 13.9114 50 15 50V48C14.7863 48 14.512 47.8639 14.3458 47.512L12.5374 48.3664ZM15 50C16.0886 50 17.0114 49.3212 17.4626 48.3664L15.6542 47.512C15.488 47.8639 15.2137 48 15 48V50ZM17.4727 48.3443L25.4211 30.4051L23.5926 29.5949L15.6441 47.5341L17.4727 48.3443ZM24.5068 29H5.49317V31H24.5068V29Z" fill="${stroke}"/>
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="${stroke}" stroke-width="2"/>
            <defs>
              <filter id="filter0_d_2326_200230" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2" dy="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200230"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200230" result="shape"/>
              </filter>
            </defs>
          </svg>`;
      }

      break;
    default:
      if (color === PIN_BLACK_TYPE) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2326_200346)">
                <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="black"/>
            </g>
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="black" stroke-width="2"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6661 16.5833V15.37C11.6091 14.7371 10.9161 13.6888 10.9161 12.5C10.9161 10.5668 12.7442 9 14.9994 9C17.2546 9 19.0827 10.5668 19.0827 12.5C19.0827 13.6888 18.3898 14.7377 17.3328 15.37V16.5833H12.6661ZM19.7518 20.3184C19.9799 20.1708 20.25 20.0833 20.5417 20.0833C21.3472 20.0833 22 20.7361 22 21.5417C22 22.3472 21.3472 23 20.5417 23C19.8837 23 19.3336 22.5613 19.1522 21.9622L15 20.4322L10.8478 21.9622C10.6664 22.5613 10.1163 23 9.45833 23C8.65275 23 8 22.3472 8 21.5417C8 20.7361 8.65275 20.0833 9.45833 20.0833C9.75 20.0833 10.0201 20.1714 10.2482 20.3184L12.4695 19.5L10.2482 18.6816C10.0201 18.8292 9.75 18.9167 9.45833 18.9167C8.65275 18.9167 8 18.2639 8 17.4583C8 16.6528 8.65275 16 9.45833 16C10.1163 16 10.6664 16.4392 10.8478 17.0383L15 18.5678L19.1522 17.0378C19.3336 16.4387 19.8837 16 20.5417 16C21.3472 16 22 16.6528 22 17.4583C22 18.2639 21.3472 18.9167 20.5417 18.9167C20.25 18.9167 19.9799 18.8292 19.7518 18.6816L17.5305 19.5L19.7518 20.3184ZM16.4578 11.9167C16.9408 11.9167 17.3328 12.3081 17.3328 12.7917C17.3328 13.2752 16.9408 13.6667 16.4578 13.6667C15.9748 13.6667 15.5828 13.2752 15.5828 12.7917C15.5828 12.3081 15.9742 11.9167 16.4578 11.9167ZM14.4161 12.7917C14.4161 12.3081 14.0241 11.9167 13.5411 11.9167C13.0575 11.9167 12.6661 12.3081 12.6661 12.7917C12.6661 13.2752 13.0581 13.6667 13.5411 13.6667C14.0241 13.6667 14.4161 13.2752 14.4161 12.7917Z" fill="white"/>
            <defs>
              <filter id="filter0_d_2326_200346" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2" dy="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200346"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200346" result="shape"/>
              </filter>
            </defs>
          </svg>`;
        break;
      } else if (hasNote) {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 33 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2326_200272)">
            <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" fill="${fill}"/>
          </g>
          <path d="M16.5249 6.08475C16.0233 6.02872 15.515 6.00047 15 6C14.4854 6 13.9771 6.02828 13.4751 6.08484C3.42887 7.20708 -2.02866 18.6956 2.75706 28.8248L13.4416 52.9392C13.7503 53.5926 14.3489 54 15 54C15.6511 54 16.2497 53.5926 16.5584 52.9392L27.2429 28.8248C32.0287 18.6955 26.5711 7.20699 16.5249 6.08475Z" stroke="${stroke}" stroke-width="2"/>
          <rect x="18.7778" y="1.77783" width="12.4444" height="12.4444" rx="6.22222" fill="white"/>
          <rect x="19.7778" y="2.77783" width="10.4444" height="10.4444" rx="5.22222" stroke="${stroke}" stroke-width="2"/>
          <defs>
            <filter id="filter0_d_2326_200272" x="1" y="6" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="2" dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200272"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200272" result="shape"/>
            </filter>
          </defs>
          </svg>`;
      } else {
        pinIcon = `
          <svg width="34" height="58" viewBox="0 0 31 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2326_200274)">
                <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" fill="${fill}"/>
            </g>
            <path d="M16.5249 1.08475C16.0233 1.02872 15.515 1.00047 15 1C14.4854 1 13.9771 1.02828 13.4751 1.08484C3.42887 2.20708 -2.02866 13.6956 2.75706 23.8248L13.4416 47.9392C13.7503 48.5926 14.3489 49 15 49C15.6511 49 16.2497 48.5926 16.5584 47.9392L27.2429 23.8248C32.0287 13.6955 26.5711 2.20699 16.5249 1.08475Z" stroke="${stroke}" stroke-width="2"/>
            <defs>
              <filter id="filter0_d_2326_200274" x="1" y="1" width="30" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2" dy="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2326_200274"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2326_200274" result="shape"/>
              </filter>
            </defs>
          </svg>`;
      }

      break;
  };

  return getEncodedIcon(pinIcon);
};

const getEncodedIcon = (svg) => {
  const decoded = unescape(encodeURIComponent(svg));
  const base64 = btoa(decoded);

  return `data:image/svg+xml;base64,${base64}`;
};
