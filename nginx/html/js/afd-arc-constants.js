/* ********************************************************************
 * AFD ARC constants
 *
 */
  var AFD_STAMP_ID=[3,4,5,9,10,11,12,14,15,16,19,20,21,25,26,27,28,30,31,32];
  
  var AFD_STAMP = [ "4:3 frame, code  0010", //3
                    "4:3 frame, code  0011", //4
                     "4:3 frame, code  0100", //5
                     "4:3 frame, code  1000", //9
                     "4:3 frame, code  1001", //10
                     "4:3 frame, code  1010", //11
                     "4:3 frame, code  1011", //12
                     "4:3 frame, code  1101", //14
                     "4:3 frame, code  1110", //15
                     "4:3 frame, code  1111", //16
                     "16:9 frame, code  0010", //19
                     "16:9 frame, code  0011", //20
                     "16:9 frame, code  0100", //21
                     "16:9 frame, code  1000", //25
                     "16:9 frame, code  1001", //26
                     "16:9 frame, code  1010", //27
                     "16:9 frame, code  1011", //28
                     "16:9 frame, code  1101", //30
                     "16:9 frame, code  1110", //31
                     "16:9 frame, code  1111"] //32
					 
  
					
  var AFD_DESCRIPTION_1 = [ "", // -1

			"", // 0

			"", // 1

			"4:3 coded frame, code '0010'<br>Box 16:9(top)", // 2

			"4:3 coded frame, code '0011'<br>Box 14:9(top)", // 3

			"4:3 coded frame, code '0100'<br>Box > 16:9(center)", // 4

			"", // 5

			"", // 6

			"", // 7

			"4:3 coded frame, code '1000'<br>Full Frame", // 8

			"4:3 coded frame, code '1001'<br>Full Frame", // 9

			"4:3 coded frame, code '1010'<br>16:9(center)", // 10

			"4:3 coded frame, code '1011'<br>14:9(center)", // 11

			"", // 12

			"4:3 coded frame, code '1101'<br>4:3(with alternative 14:9 center)", // 13

			"4:3 coded frame, code '1110'<br>16:9(with alternative 14:9 center)", // 14

			"4:3 coded frame, code '1111'<br>16:9(with alternative 4:3 center)", // 15

			"", // 16 - 0

			"", // 17 - 1:1

			"16:9 coded frame, code '0010'<br>Full Frame", // 18 - 1:8

			"16:9 coded frame, code '0011'<br>14:9(center)", // 19 - 1:3

			"16:9 coded frame, code '0100'<br>Box > 16:9(center)", // 20 - 1:4

			"", // 21 - 1:5

			"", // 22 - 1:6

			"", // 23 - 1:7

			"16:9 coded frame, code '1000'<br>Full Frame", // 24 - 1:8

			"16:9 coded frame, code '1001'<br>4:3(center)", // 25 - 1:9

			"16:9 coded frame, code '1010'<br>16:9(with complete 16:9 image protected)", // 26 - 1:10

			"16:9 coded frame, code '1011'<br>14:9(center)", // 27 - 1:11

			"", // 28 - 1:12

			"16:9 coded frame, code '1101'<br>4:3(with alternative 14:9 center)", // 29 - 1:13

			"16:9 coded frame, code '1110'<br>16:9(with alternative 14:9 center)", // 30 - 1:14

			"16:9 coded frame, code '1111'<br>16:9(with alternative 4:3 center)", // 31 - 1:15

			"16:9 coded frame, code '100000'", // 32

			"16:9 coded frame, code '100001'", // 33

			"16:9 coded frame, code '100010'", // 34
  ];

	var AFD_DESCRIPTION_2 = [ "", // -1

			"", // 0

			"", // 1

			"Image with a 16:9 aspect ratio as letterbox at<br>" +

			" the top of a 4:3 coded frame", // 2

			"Image with a 14:9 aspect ratio as letterbox at<br>" +

			" the top of a 4:3 coded frame", // 3

			"Image with aspect ratio greater than 16:9 as<br>" +

			" a vertically centered letterbox in a 4:3<br>" +

			" coded frame", // 4

			"", // 5

			"", // 6

			"", // 7

			"Image is full frame, with an aspect ratio that is<br>" +

			" the same as the 4:3 coded frame", // 8

			"Image is full frame, with an aspect ratio that is<br>" +

			" the same as the 4:3 coded frame", // 9

			"Image with a 16:9 aspect ratio as a vertically<br>" +

			" centered letterbox in a 4:3 coded frame", // 10

			"Image with a 14:9 aspect ratio as a vertically<br>" +

			" centered letterbox in a 4:3 coded frame", // 11

			"", // 12

			"Image with a 4:3 aspect ratio and with an<br>" +

			" alternative 14:9 center in a 4:3 coded frame", // 13

			"Image with a 16:9 aspect ratio and with an<br>" +

			" alternative 14:9 center as a vertically<br>" +

			" centered letterbox in a 4:3 coded frame", // 14

			"Image with a 16:9 aspect ratio and with an<br>" +

			" alternative 4:3 center as a vertically<br>" +

			" centered letterbox in a 4:3 coded frame", // 15

			"", // 16 - 0

			"", // 17 - 1:1

			"Image is full frame, with an aspect ratio that is<br>" +

			" the same as the 16:9 coded frame", // 18 - 1:8

			"Image with a 14:9 aspect ratio as a<br>" +

			" horizontally centered pillarbox image<br>" +

			" in a 16:9 coded frame", // 19 - 1:11

			"Image with aspect ratio greater than 16:9 as<br>" +

			" a vertically centered letterbox in a 16:9<br>" +

			" coded frame", // 20 - 1:4

			"", // 21 - 1:5

			"", // 22 - 1:6

			"", // 23 - 1:7

			"Image is full frame, with an aspect ratio that is<br>" +

			" the same as the 16:9 coded frame", // 24 - 1:8

			"Image with a 4:3 aspect ratio as a<br>" +

			" horizontally centered pillarbox image<br>" +

			" in a 16:9 coded frame", // 25 - 1:9

			"Image is full frame, with a 16:9 aspect<br>" +

			" ratio and with all image areas protected", // 26 - 1:10

			"Image with a 14:9 aspect ratio as a<br>" +

			" horizontally centered pillarbox image<br>" +

			" in a 16:9 coded frame", // 27 - 1:11

			"", // 28 - 1:12

			"Image with a 4:3 aspect ratio and with an<br>" +

			" alternative 14:9 center as a horizontally<br>" +

			" centered pillarbox image in a 16:9 coded frame", // 29 - 1:13

			"Image with a 16:9 aspect ratio and with an<br>" +

			" alternative 14:9 center in a 16:9<br>" +

			" coded frame", // 30 - 1:14

			"Image with a 16:9 aspect ratio and with an<br>" +

			" alternative 4:3 center in a 16:9<br>" +

			" coded frame", // 31 - 1:15

			"", // 32

			"", // 33

			"", // 34

	];
	
  var ARC_FROM = [ "full", "user", 
			"1", 
			"2", 
			"3", 
			"4", 
			"5", 
			"6", 
			"7", 
			"8", 
			"9", 
			"Cut6", 
			"Cut6", 
			"Cut6", 
			"Cut6", 
			"Cut7", 
			"Cut8", 
			"Cut9", 
			"13", 
			"14", 
			"15", 
			"16", 
			"13", 
			"Cut14", 
			"Cut15", 
			"Cut16", 
			"Cut16", 
			"Cut17", 
			"Cut18", 
			"Cut19", 
			"Cut19", 
			"Cut5",
			"7", 
			"21", 
			"22" ];
var ARC_TO = [ "full", // 0
			"user", // 1
			"Cut1", // 1
			"Cut2", //
			"Cut3", //
			"Cut4", //
			"Cut4", //
			"Cut4", //
			"Cut5", //
			"Cut5", //
			"Cut5", //
			"Cut5", //
			"8", //
			"10", //
			"9", //
			"11", //
			"12", //
			"13", //
			"Cut12", //
			"Cut11", //
			"Cut10", //
			"Cut6", //
			"Cut13", //
			"17", //
			"18", //
			"11", //
			"19", //
			"17", //
			"18", //
			"11", //
			"19", //
			"Cut6", //
			"Cut20", //
			"Cut6", //
			"Cut21" ];

			
			
     var ARC_DESCRIPTION = [
			"Converts the full input frame to full output frame.", // 0

			"Conversion is user defined.", // 1

			"Horizontally centered 4:3 image in a 16:9 frame<br> is cropped to fit into a 16:9 frame.", // 1

			"Horizontally centered 13:9 image in a 16:9 frame<br> is cropped to fit into a 16:9 frame.", // 1

			"Horizontally centered 14:9 image in a 16:9 frame<br> is cropped to fit into a 16:9 frame.", // 1

			"Horizontally centered 13:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then cropped to fit into a 16:9 frame.", //

			"Horizontally centered 14:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then cropped to fit into a 16:9 frame.", //

			"Horizontally centered 16:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then cropped to fit into a 16:9 frame.", //

			"Horizontally centered 13:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then horizontally centered into a 16:9 frame.", //

			"Horizontally centered 14:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then horizontally centered into a 16:9 frame.", //

			"Horizontally centered 16:9 image in a 16:9 frame<br> is squeezed back into its original 4:3 aspect,<br> then horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is stretched to 4:3, then<br> horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is stretched to 13:9, then<br> horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is stretched to 14:9, then<br> horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is stretched to 16:9, then<br> horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is cropped to fit into a 13:9 frame,<br> then horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is cropped to fit into a 14:9 frame,<br> then horizontally centered into a 16:9 frame.", //

			"Full frame 4:3 image is cropped to fit into a 16:9 frame,<br> then horizontally centered into a 16:9 frame.", //

			"Full frame 16:9 image is cropped to fit into a 16:9 frame,<br> then vertically centered into a 4:3 frame.", //

			"Full frame 16:9 image is cropped to fit into a 14:9 frame,<br> then vertically centered into a 4:3 frame.", //

			"Full frame 16:9 image is cropped to fit into a 13:9 frame,<br> then vertically centered into a 4:3 frame.", //

			"Full frame 16:9 image is cropped to fit into<br> a 4:3 frame.", //

			"Full frame 16:9 image is squeezed into a<br> 4:3 frame.", //

			"16:9 image at top of 4:3 frame is put into<br> a 16:9 frame.", //

			"14:9 image at top of 4:3 frame is cropped to<br> fit into a 16:9 frame.", //

			"14:9 image at top of 4:3 frame is horizontally<br> centered into a 16:9 frame.", //

			"14:9 image at top of 4:3 frame is stretched<br> into a 16:9 frame.", //

			"Vertically centered 16:9 image in a 4:3 frame<br> is put into a 16:9 frame.", //

			"Vertically centered 14:9 image in a 4:3 frame<br> is cropped to fit into a 16:9 frame.", //

			"Vertically centered 14:9 image in a 4:3 frame<br> is horizontally centered into a 16:9 frame.", //

			"Vertically centered 14:9 image in a 4:3 frame<br> is stretched into a 16:9 frame.", //

			"Horizontally centered 4:3 image on a 16:9 frame<br> is put into a 4:3 frame.", //

			"Horizontally centered 14:9 image on a 16:9 frame<br> is vertically centered into a 4:3 frame.", //

			"Horizontally centered 14:9 image on a 16:9 frame<br> is cropped to fit into a 4:3 frame.", //

			"Horizontally centered 14:9 image on a 16:9 frame<br> is squeezed into a 4:3 frame." ];
			
  

 
