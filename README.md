# Скрипт минтит NFT на Holograph

Тоже самое можно сделать вручную на https://app.holograph.xyz/

NFT Where Do We Go From Here?

Для запуска скрипта нужен Node.js, если ещё не установлен, устанавливаем с
https://nodejs.org/en

НЕ УСТАНАВЛИВАЙТЕ версию Current, ставьте версию LTS!

Запускаем терминал, переходим в терминале в папку с stg

Выполняем команды:

```
npm install
```

ждём когда установятся все зависимости если появились ошибки, пробуем команду

```
npm install --legacy-peer-deps
```

Далее необходимо добавить приватные ключи в файл keys.txt каждый ключ на новой
строке

## Принцип работы

Скрипт смотрит баланс в сетях:

- POLYGON
- AVALANCHE
- BSC
- OPTIMISM
- ARBITRUM
- MANTLE

Выбирает сеть с самым большим балансом

## Настройки в файле constants.ts:

`export const DELAY_FROM_SEC = 300` - минимальное время ожидания в секундах
между кошельками

`export const DELAY_TO_SEC = 600` - максимальное время ожидания в секундах между
кошельками

`export const MAX_GAS_GWEI = 40` - максимальное количество GWEI в L1 чтобы
скрипт начал бриджить, иначе ждёт более дешёвый газ

Запуск

```
npm start
```

## Поблагодарить автора можно отправив донат в любой evm сети на:

```
raznorabochiy.eth
raznorabochiy.arb
raznorabochiy.bnb
0xE8eAbec7CE9e8Bf78A766E8556E542BC2C9446ae
```
