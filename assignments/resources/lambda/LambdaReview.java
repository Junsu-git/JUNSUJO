import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.function.IntSupplier;
import java.util.function.Supplier;
import java.util.stream.Collectors;

/** Standalone study example. Requires JDK 8 or later. */
public class LambdaReview {
    static final class Player {
        final String name;
        final int level;

        Player(String name, int level) {
            this.name = name;
            this.level = level;
        }

        @Override public String toString() {
            return name + ":" + level;
        }
    }

    @FunctionalInterface
    interface CheckedSupplier<T> {
        T get() throws IOException;
    }

    static String readOrFallback(CheckedSupplier<String> source) {
        try {
            return source.get();
        } catch (IOException failure) {
            return "fallback:" + failure.getMessage();
        }
    }

    static IntSupplier withBonus(int base) {
        return () -> base + 5;
    }

    static List<Player> selectNormally(List<Player> players) {
        List<Player> selected = new ArrayList<Player>();
        for (Player player : players) {
            if (player.level >= 10) selected.add(player);
        }
        selected.sort(new Comparator<Player>() {
            @Override public int compare(Player left, Player right) {
                int byLevel = Integer.compare(right.level, left.level);
                return byLevel != 0 ? byLevel : left.name.compareTo(right.name);
            }
        });
        return selected;
    }

    static List<Player> selectWithLambda(List<Player> players) {
        return players.stream()
            .filter(player -> player.level >= 10)
            .sorted(Comparator.comparingInt((Player player) -> player.level)
                .reversed().thenComparing(player -> player.name))
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        Function<String, Integer> length = String::length;
        System.out.println("method-reference=" + length.apply("Mira"));

        int bonus = 3;
        Supplier<Integer> captured = () -> 10 + bonus;
        System.out.println("capture=" + captured.get());

        System.out.println("exception=" + readOrFallback(() -> {
            throw new IOException("offline");
        }));
        System.out.println("closure=" + withBonus(10).getAsInt());

        List<Player> players = Arrays.asList(
            new Player("Mira", 12), new Player("Joon", 7), new Player("Ara", 20));
        String normal = selectNormally(players).toString();
        String lambda = selectWithLambda(players).toString();
        if (!normal.equals(lambda)) {
            throw new AssertionError("Implementations differ: " + normal + " / " + lambda);
        }
        System.out.println("normal=" + normal);
        System.out.println("lambda=" + lambda);
    }
}
