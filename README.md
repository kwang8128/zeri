# zeri

This bots aims to ease calculations needed for Chinese fortune-telling and divination. Currently, a calculator for converting from Western calendar dates to *bazi* has been implemented, as well as a method for converting 2 to 3 numbers to hexagrams for consulting the *Yi Jing*, more commonly known as the I Ching in the West.

*Bazi* (literally "eight characters") is a concept used in Chinese astrology, which is composed of the person's date and time of birth. This bot aims to calculate the *bazi* of a time given a Gregorian calendar date.

Sample usage:
```
!<year><month><day><hour>
//> gives bazi of the date
```

An example:
For January 1, 2000, 00:00, enter the following in Discord:
```
!2000010100
```
The bot will print out the following in Discord:
```
年月日時
己甲戊壬
卯子午子
```

This bot also helps with generating a hexagram based on numbers provided by the user, as well as generating the changed hexagram as well. If the user provides three numbers, the first two will be used for generating the base hexagram, and the third number will be used for generating the changing line for the changed hexagram. If the user provides only two numbers, the two numbers will be used for generating the base hexagram, and the sum of the two numbers will be used for generating the changing line for the changed hexagram. The bot will also send a link from https://ctext.org/book-of-changes, highlighting the relevant section for the base hexagram so the user can read more about the hexagram the generated hexagram.

Sample usage:
```
#<first number> <second number> <optional: third number>
//> gives bazi of the date
```
