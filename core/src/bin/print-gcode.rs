use std::fs;


fn main() {
    let contents = fs::read_to_string("../.testdata/haskins-guitar-headstock-nonmodal.nc")
        .expect("Something went wrong reading the file");

    let commands: Vec<_> = gcode::parse(&contents).collect();

    println!("{}", commands.len());
    // for line in  {
    //     println!("{}",   line);
    // }
}
