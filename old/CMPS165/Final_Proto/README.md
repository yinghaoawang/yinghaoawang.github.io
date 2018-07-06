# Prototype for final project

## Introduction
Brian Tran and I were booted from our main group (social media geomap). We decided to work on
an abandoned idea proposed by Nathan Hutchison McHone about California fire danger
(link (here)[https://nlhutchi.github.io/CalFireDangerMap/]).

## Problems
I wanted to come up with a prototype as soon as possible, but problems with the data were not
small. 

### 2008 to 2016 data
The best data (from 2008 to 2016) were in PDF format. I had to convert them to
XLS, manually edit them, then export as csv files. Data from 2008 to 2015 had different ordering
of labels, so the code had to account for dynamic parsing of column names.

### 2007 and below data
The data from 2007 and below were even worse. They were just scanned PDFs of printed papers that
were usually blurry. Some of them were just hand written sheets of paper with arithmetic done in
the margins. We would have to manually enter the data if we were to use these data sets.

## Dealing with the problems
Luckily, I had only spent 2 hours coding before investigating the data sets (which I should have
done at the start). I have decided on writing a basic prototype that just displays the California
wildfires based on the type selected. 