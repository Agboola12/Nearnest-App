import { OwnerAppointment } from '../types';

export const getLocalIsoDate = (date: Date = new Date()) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const TODAY_ISO = getLocalIsoDate();

export const parseTimeToMinutes = (time: string) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') {
    hours += 12;
  }

  return hours * 60 + Number(match[2]);
};

export const sortAppointments = (appointments: OwnerAppointment[]) => {
  return [...appointments].sort((a, b) => {
    const aIsPast = a.date < TODAY_ISO;
    const bIsPast = b.date < TODAY_ISO;

    if (aIsPast !== bIsPast) {
      return aIsPast ? 1 : -1;
    }

    if (a.date !== b.date) {
      return aIsPast ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    }

    return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
  });
};

export const formatAppointmentDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00`);
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  if (isoDate === TODAY_ISO) {
    return `Today, ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  }

  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: dateYear !== currentYear ? 'numeric' : undefined,
  });
};

export const formatLongDate = (isoDate: string) => {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const toTimeInputValue = (time: string) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return '';

  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') {
    hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${match[2]}`;
};

export const toDisplayTime = (value: string) => {
  const [hoursValue, minutes = '00'] = value.split(':');
  const hours = Number(hoursValue);

  if (Number.isNaN(hours)) return value;

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${minutes.padStart(2, '0')} ${period}`;
};
