// import React from 'react';
// import styled, {css} from 'styled-components';
// import {Row} from './Layout';
// import {numberWithCommas} from '../util';
// import Icon from './Icon';
// import {switchProp, ifProp} from 'styled-tools';
// import {palette} from '../styles';
// import {Col} from './Layout';

// const Wrapper = styled(Col)`
//   --total: 12px;
//   --delta: 10px;
//   --color: ${palette.darkGrey};
//   --bg: ${palette.lightGrey};
//   --border-radius: 4px;
//   --font-weight: 600;
//   --margin-left: 0px;
//   --padding: 0px 4px;

//   ${switchProp('color', {
//     black: css`
//       --color: ${palette.darkGrey};
//       --bg: ${palette.lightGrey};
//     `,
//     blue: css`
//       --color: ${palette.blue};
//       --bg: ${palette.lightBlue};
//     `,
//     red: css`
//       --color: ${palette.red};
//       --bg: ${palette.lightRed};
//     `,
//   })}

//   ${ifProp(
//     'big',
//     css`
//       --total: 24px;
//       --delta: 16px;
//       --border-radius: 6px;
//       --font-weight: bold;
//       --padding: 0px 10px;
//       --margin-left: 8px;
//     `
//   )}

//   color: var(--color);
//   svg {
//     stroke: var(--color);
//   }
//   .total {
//     font-size: var(--total);
//     font-weight: var(--font-weight);
//   }
//   .delta {
//     justify-content: center;
//     align-items: center;
//     font-size: var(--delta);
//     background: var(--bg);
//     border-radius: var(--border-radius);
//     padding: var(--padding);
//     margin: 2px 0px;
//     margin-left: var(--margin-left);
//     font-weight: 300;
//   }
//   .label {
//     font-size: 10px;
//     opacity: 0.8;
//     margin-bottom: 2px;
//   }
// `;
// const Number = styled(Row)``;
// const Delta = styled(Row)``;

// const Stat = ({data, type, big, label}) => {
//   const {total, delta} = data;
//   const deltaPositive = delta > 0;
//   const color = type == 'total' ? 'black' : deltaPositive ? 'red' : 'blue';
//   return (
//     <Wrapper big={big} color={color}>
//       {label && <div className="label">{label}</div>}
//       <Row alignItems="center">
//         <div className="total">{numberWithCommas(total)}</div>
//         <Row className="delta">
//           <span>{Math.abs(delta)}</span>
//           <Icon
//             name="arrowLeft"
//             style={{transform: `rotate(${deltaPositive ? 90 : 270}deg)`}}
//           ></Icon>
//         </Row>
//       </Row>
//     </Wrapper>
//   );
// };

// export default Stat;
