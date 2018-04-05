use strict;
use warnings;

my $repo_dir = './course-arrange';
my $lib_dir = './src/app/course-arrange';

if (-e $repo_dir) {
  system("cd $repo_dir && git pull origin master");
} else {
  `git clone https://github.com/huchenlei/course-arrange.git $repo_dir`;
}

if (!(-e $lib_dir)) {
  mkdir $lib_dir;
}

`cp $repo_dir/src/* ./src/app/course-arrange`;
