import { getEvents } from '../ethers';

const fetchEvents = (event, fromAddress, toAddress, tokenIdDecimal) => {
  let eventType = null;

  if (event !== 'all') {
    eventType = event;
  }
  const from = fromAddress ? utils.formatBytes32String(fromAddress) : null;
  const to = toAddress ? utils.formatBytes32String(toAddress) : null;
  const tokenId = tokenIdDecimal
    ? `0x${Number(tokenIdDecimal)
        .toString(16)
        .padStart(64, '0')}`
    : null;

  const options = {
    eventType,
    from,
    to,
    tokenId,
  };
  return getEvents(options);
};

export default fetchEvents;
