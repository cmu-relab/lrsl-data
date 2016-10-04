# LRSL Data
This repository contains data for the Legal Requirements Specification Language
(LRSL).

## GPO, CFR, and XMLs
The [US Government Publishing Office](https://www.gpo.gov) publishes XML
versions of regulations as Code of Federal Regulations (CFR). The Home Mortgage
Disclosures Act (HMDA) Regulation C is codified under the Title-12 of CFR in
section 1003. The entire Title-12 is accessible here:
URL: https://www.gpo.gov/fdsys/bulkdata/CFR/2016/title-12/CFR-2016-title-12.zip
MD5 (CFR-2016-title-12.zip) = da32f5986746113d31ad5b603867d7d0

### Home Mortgage Disclosures Act (HMDA) Regulation C
The HMDA Regulation C can be accessed in XML format from here:
URL: https://www.gpo.gov/fdsys/pkg/CFR-2012-title12-vol8/xml/CFR-2012-title12-vol8-part1003.xml
MD5 = e834b8a7ecf60ccd86f1e3a9b6b5358a

Use the cfr_xml_parser.py script to extract data as follows:

```sh
python cfr_xml_parser.py > hmda_full.txt
```

## Annotation using BRAT
To use [BRAT](https://github.com/nlplab/brat) for annotation, make sure the
submodule in the `brat` directory is properly initialized. If you see nothing
inside the `brat` directory do this once:

```sh
git submodule update --init --recursive
```

Note that we use BRAT in standalone mode, so install and start it as follows:
as:

```sh
# make sure you are in the brat directory
cd brat/
# install it for standalone mode if not done already
# the installation asks for username and password to access brat
# give something simple admin admin123 root@localhost
./install.sh -u
# when done, run the standalone server on <PORT_NUMBER> as follows
# note that default port is 8001
python standalone.py <PORT_NUMBER>
```

