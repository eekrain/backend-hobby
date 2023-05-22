import { seedPrismaClient } from '.';
import { generatePassword } from '../../src/utils/hash';

export const user_amikom_parking = async () => {
  let eka = {
    nim: '17.11.1768',
    nama: 'Ardian Eka Candra',
    pass: '20032',
    foto: 'https://media.licdn.com/dms/image/D5603AQHhLGdRv5k3Rg/profile-displayphoto-shrink_800_800/0/1684036402866?e=1690416000&v=beta&t=jIsQGVhGOKVlM6DmmS238AeDBrbvHny8djM8OT1IzNw',
  };
  let irfan = {
    nim: '17.11.1738',
    nama: 'Irfan Maulana',
    pass: '20032',
    foto: 'https://media.licdn.com/dms/image/D5635AQHLwh8wamFTVw/profile-framedphoto-shrink_800_800/0/1683909232885?e=1685361600&v=beta&t=vjZ7Wg0jmDX4yL_OsJlBch3mnclQ8YTCXYvsWzF-ofE',
  };

  eka.pass = await generatePassword(eka.pass);
  irfan.pass = await generatePassword(irfan.pass);

  const a = await seedPrismaClient.user.upsert({
    where: { nim: eka.nim },
    update: eka,
    create: eka,
  });
  const b = await seedPrismaClient.user.upsert({
    where: { nim: irfan.nim },
    update: irfan,
    create: irfan,
  });
  console.log({ a, b });
};
