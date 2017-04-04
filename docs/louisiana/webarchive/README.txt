LRS Chapter 51. Database Security Breach Notification Law
Use printer-friendly URLs in sequence to download the .html files
```sh
for i in {322027..322033}; do curl "http://legis.la.gov/Legis/LawPrint.aspx?d=$i" -o $i.html ; done
```
Then use Apache Tika to output the txt file
```sh
for i in {322027..322033}; do tika -t "${i}.html" > "${i}.txt" ; echo done $i ; done
```
Finally rename files:

```sh
for i in {322027..322033}; do j=$(( i - 322026 + 3070 )) ; mv $i.html $j.html ; mv $i.txt $i.txt ; done
```
