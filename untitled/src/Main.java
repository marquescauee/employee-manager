public class Main {

    public static int fib(int n) {


        if(n == 0) {
            System.out.println(n);
        }

        if(n == 1) {
            System.out.println(n);
        }

        int x = fib(n - 1) + fib(n - 2);

        System.out.println(x);

        return x;
    };

    public static void main(String[] args) {

        System.out.println(fib(3));
    }
}